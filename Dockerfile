FROM jenkins/jenkins:lts

# Installer les dépendances nécessaires
USER root
RUN apt-get update && apt-get install -y python3 python3-pip

# Revenir à l'utilisateur Jenkins
USER jenkins
