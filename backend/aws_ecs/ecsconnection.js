const { ECSClient, RegisterTaskDefinitionCommand, RunTaskCommand } = require('@aws-sdk/client-ecs');

// Configuration
const CLUSTER_NAME = 'chatbot-server-cluster';
const REGION = 'us-east-1';
const SUBNET_ID = 'subnet-0905eb5f314e27c24';
const SECURITY_GROUP_ID = 'sg-0a170d3395bbff3ea';
const EXECUTION_ROLE_ARN = 'arn:aws:iam::729950049550:role/ecsTaskExecutionRole';

// Initialize ECS client
const ecsClient = new ECSClient({ region: REGION });

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
        // const userContainers = [
           
        //     {
        //         taskDefName: 'user2-task-def',
        //         dockerImage: 'user2-docker-image-uri',
        //         containerName: 'user2-container',
        //         containerPort: 5001,
        //     },
        //     // Add more users as needed
        // ];

        // Register and run tasks for each user's container
        const taskDefinitionArn = await registerTaskDefinition(user.taskDefName, user.dockerImage, user.containerName, user.containerPort,google_key,pinecone_key,namespace,promptTemplate);
        // console.log(`Registered Task Definition: ${taskDefinitionArn}`);

        const runTaskResponse = await runTask(taskDefinitionArn);
        console.log(taskDefinitionArn);
        // console.log('Run Task Response:', JSON.stringify(runTaskResponse, null, 2));
        console.log(runTaskResponse);

    } catch (error) {
        console.error('Error:', error);
    }
}

// main();
module.exports={
    createcontainer
}
