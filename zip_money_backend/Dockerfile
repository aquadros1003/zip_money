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
COPY ./entrypoint.sh $DockerHOME/entrypoint.sh
# run this command to install all dependencies  
RUN chmod 777 ./$DockerHOME/entrypoint.sh
RUN pip install -r ./$DockerHOME/requirements.txt
# port where the Django app runs  
EXPOSE 8000

# run this command to start the server
CMD ["./app/entrypoint.sh"]