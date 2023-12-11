# base image  
FROM python:3.11  
# setup environment variable  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV DockerHOME=/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  
ENV PYTHONPATH=$DockerHOME:$PYTHONPATH

# install dependencies  
RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 
COPY . $DockerHOME
# run this command to install all dependencies  
RUN chmod +x ./$DockerHOME/entrypoint.sh
RUN pip install -r ./$DockerHOME/requirements.txt
# port where the Django app runs  
EXPOSE 8000