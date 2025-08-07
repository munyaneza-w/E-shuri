# Phase Submission

## Live Application URL
>>>>>>>>>>>>>>>>>>>: https://ishuri-app.onrender.com/ 

## Provisioned Resources Screenshots

**(Screenshot 1: AWS ECS Cluster)**

**(Screenshot 2: AWS RDS Database Instance)**

**(Screenshot 3: AWS Application Load Balancer)**

## Peer Review

[Link to the Pull Request I Reviewed]: https://github.com/vanessaU4/Book_hub/pull/25


## Reflection

### Challenges of Manual Deployment vs. IaC

During this project, I experienced both manual deployment processes and the Infrastructure as Code (IaC) approach using Terraform.

**Manual Deployment:**
*   **(Challenge 1: Prone to Human Error)** Manually clicking through the AWS console to set up VPCs, subnets, security groups, and other resources is tedious and highly susceptible to misconfiguration. It's easy to forget a step or select the wrong option, leading to hours of debugging.
*   **(Challenge 2: Lack of Reproducibility)** Recreating the exact same environment for testing, staging, or another region is nearly impossible. There's no guarantee of consistency, which can lead to "it works on my machine" type issues.
*   **(Challenge 3: Poor Scalability and Management)** As the application grows, managing the infrastructure manually becomes exponentially more complex. There is no version control for the infrastructure, making it difficult to track changes or roll back to a previous state.

**Infrastructure as Code (IaC) with Terraform:**
*   **(Challenge 1: Initial Learning Curve)** While powerful, Terraform has a steep learning curve. Understanding the HCL syntax, state management, providers, and the dependency graph of resources took some time and effort. Debugging `terraform plan` or `apply` errors, especially with complex dependency chains (like the one between the RDS instance and the Secrets Manager secret), was initially challenging.
*   **(Challenge 2: State Management)** Terraform's state file is critical. If it gets corrupted or lost, it can be a major issue. Managing state, especially in a team environment, requires a proper backend configuration (like an S3 bucket with locking) to avoid conflicts.
*   **(Challenge 3: Abstraction Complexity)** While Terraform abstracts away many of the direct API calls, understanding how the resources interact under the hood is still necessary. For example, knowing that a private ECS task needs a NAT Gateway for outbound internet access to pull an ECR image is crucial knowledge that isn't immediately obvious from the Terraform code alone.

Overall, despite the initial challenges, the IaC approach with Terraform is vastly superior. It provides version-controlled, reproducible, and scalable infrastructure, which is essential for any serious project. The manual process highlighted just how valuable and necessary IaC is for modern software development.
