pipeline {
    agent any

    environment{
           repo_addr='registry.cn-hangzhou.aliyuncs.com'
           repo_user='d2940205300'
           repo_pass='twy528985211'
           repo_repo='hh_hh/vue_demo'
    }
    
    stages {
        stage('--------拉取git仓库代码--------') {
            steps {
       checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/2940205300/store.git']])  
                echo '拉取git仓库代码 success'
            }
                        

        }
         stage('--------nodejs构建中--------') {
            steps {
                sh "npm config set registry https://registry.npm.taobao.org/ "
                sh "cd Base \n npm i \n npm run build"
                echo "node构建成功"
            }
        }
         
    
}
}
