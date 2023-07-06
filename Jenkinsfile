pipeline {
    //指定任务在哪个集群节点上执行
    agent any
	//声明环境变量，方便后面使用
	environment {
	   repo_addr='registry.cn-hangzhou.aliyuncs.com'
     repo_user='d2940205300'
     repo_pass='twy528985211'
     repo_repo='hh_hh/vue_demo'

	}
  tools{
    nodejs 'node'
    {

    stages {
      stage('拉取git代码') {
            steps {
               sh '''git pull https://github.com/2940205300/store.git''' 
            }
        }
      	stage('构建') {
            steps {
                sh "npm config set registry https://registry.npm.taobao.org/ "
                sh "cd Base \n npm i \n npm run build"
            }
        }
        stage('推送阿里云') {
            steps {
                sh '''docker login --username=${repo_user} -p${repo_pass} ${repo_addr}
                 echo "-----------登录aliyun成功-----------"
                 docker tag ${JOB_NAME}:latest ${repo_addr}/${repo_repo}:latest
                 echo "-----------修改标签成功-----------"
                 docker push ${repo_addr}/${repo_repo}:latest
                 echo "-----------推送到aliyun成功-----------"'''    
            }
        }
	
		stage('publish to k8s') {
            steps {
                echo '代码质量检测-SUCCESS'
            }
        }
		
        

    
}
