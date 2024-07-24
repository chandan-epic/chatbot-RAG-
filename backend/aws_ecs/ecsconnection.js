const { ECSClient, RegisterTaskDefinitionCommand, RunTaskCommand, DescribeTasksCommand } = require('@aws-sdk/client-ecs');

const { EC2Client, DescribeNetworkInterfacesCommand } = require('@aws-sdk/client-ec2');


// Configuration
const CLUSTER_NAME = 'chatbot-server-cluster';
const REGION = 'us-east-1';
const SUBNET_ID = 'subnet-0905eb5f314e27c24';
const SECURITY_GROUP_ID = 'sg-0a170d3395bbff3ea';
const EXECUTION_ROLE_ARN = 'arn:aws:iam::729950049550:role/ecsTaskExecutionRole';

// Initialize ECS client
const ecsClient = new ECSClient({ region: REGION });
const ec2Client = new EC2Client({ region: REGION });

// Function to register a new task definition for each user's container
async function registerTaskDefinition(taskDefName, dockerImage, containerName,containerPort,google_key,pinecone_key,namespace,promptTemplate) {
    const params = {
        family: taskDefName,
        networkMode: 'awsvpc',
        containerDefinitions: [
            {
                name: containerName,
                image: dockerImage,
                memory: 512, // 512 MiB of RAM
                cpu: 256,    // 256 CPU units (0.25 vCPU)
                essential: true,
                portMappings: [
                    {
                        containerPort: containerPort,
                        hostPort: containerPort,
                        protocol: 'tcp',
                    },
                ],
                logConfiguration: {
                    logDriver: 'awslogs',
                    options: {
                        'awslogs-group': `/ecs/${taskDefName}`,
                        'awslogs-region': REGION,
                        'awslogs-stream-prefix': 'ecs',
                    },
                },
                environment: [
                    {
                        name: 'GEMINI_API',
                        value: google_key
                    },
                    {
                        name: 'PINECONE_API',
                        value: pinecone_key
                    },
                    {
                        name: 'PROMPT_TEMPLATE',
                        value: promptTemplate
                    },
                    {
                        name: 'NAMESPACE',
                        value: namespace
                    },
                    {
                        name: 'DB_NAME',
                        value: "pinecone-chatbot1"
                    }
                    // Add more environment variables as needed
                ],
            },
        ],
        requiresCompatibilities: ['FARGATE'],
        memory: '512', // 512 MiB of RAM
        cpu: '256',    // 256 CPU units (0.25 vCPU)
        executionRoleArn: EXECUTION_ROLE_ARN,
    };

    const command = new RegisterTaskDefinitionCommand(params);
    const response = await ecsClient.send(command);
    return response.taskDefinition.taskDefinitionArn;
}

// Function to run a task for each user's container
async function runTask(taskDefinitionArn) {
    const params = {
        cluster: CLUSTER_NAME,
        taskDefinition: taskDefinitionArn,
        count: 1,
        launchType: 'FARGATE',
        networkConfiguration: {
            awsvpcConfiguration: {
                subnets: [SUBNET_ID],
                securityGroups: [SECURITY_GROUP_ID],
                assignPublicIp: 'ENABLED',
            },
        },
    };

    const command = new RunTaskCommand(params);
    return await ecsClient.send(command);
}

async function checkTaskStatus(taskArn) {
    while (true) {
        // Describe the ECS task
        const describeTasksParams = {
            cluster: CLUSTER_NAME,
            tasks: [taskArn],
        };

        const describeTasksResponse = await ecsClient.send(new DescribeTasksCommand(describeTasksParams));
        const task = describeTasksResponse.tasks[0];

        if (!task) {
            throw new Error('Task not found');
        }

        switch (task.lastStatus) {
            case 'RUNNING':
                return task;
            case 'PENDING':
                console.log('Task is still pending. Waiting...');
                break;
            case 'STOPPED':
                console.error('Task has stopped or failed. Status:', task.stoppedReason);
                throw new Error('Task has stopped or failed');
            default:
                console.log(`Task status: ${task.lastStatus}. Waiting...`);
        }

        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 10000)); // Adjust delay as needed
    }
}

async function getPublicIp(task) {
    // Get ENI ID from the task details
    const attachmentDetails = task.attachments[0].details;
    const eniIdDetail = attachmentDetails.find(detail => detail.name === 'networkInterfaceId');
    const eniId = eniIdDetail ? eniIdDetail.value : null;

    if (!eniId) {
        throw new Error('Network interface ID not found');
    }

    // Describe the ENI to get the public IP
    const describeNetworkInterfacesParams = {
        NetworkInterfaceIds: [eniId],
    };

    const describeNetworkInterfacesResponse = await ec2Client.send(new DescribeNetworkInterfacesCommand(describeNetworkInterfacesParams));
    const networkInterface = describeNetworkInterfacesResponse.NetworkInterfaces[0];
    return networkInterface.Association ? networkInterface.Association.PublicIp : null;
}
// Main function to deploy multiple users' containers under a single service
async function createcontainer(username,google_key,pinecone_key,namespace,promptTemplate) {
    try {
        // Example user containers
        const user= {
            taskDefName: 'chatbot-server-task3',
            dockerImage: '729950049550.dkr.ecr.us-east-1.amazonaws.com/chatting-server:latest',
            containerName: 'user1-container',
            containerPort: 3000,
        }
     
        const taskDefinitionArn = await registerTaskDefinition(user.taskDefName, user.dockerImage, user.containerName, user.containerPort,google_key,pinecone_key,namespace,promptTemplate);

        const runTaskResponse = await runTask(taskDefinitionArn);
        const taskArn = runTaskResponse.tasks[0].taskArn;

        // Check task status and get the public IP address
        const task = await checkTaskStatus(taskArn);
        const ip = await getPublicIp(task);
        return ip;
    } catch (error) {
        console.error('Error:', error);
    }
}


// main();
module.exports={
    createcontainer
}
