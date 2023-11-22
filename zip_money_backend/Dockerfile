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
ENV APP_SETTINGS=Dev
ENV SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=40478976477-hqbi27e2l03dhoe7oeg813ipth1hb8qj.apps.googleusercontent.com
ENV SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=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

# install dependencies  
RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 
COPY . $DockerHOME
# run this command to install all dependencies  
RUN chmod +x ./$DockerHOME/entrypoint.sh
RUN pip install -r ./$DockerHOME/requirements.txt
# port where the Django app runs  
EXPOSE 8000
# start server  

CMD ["./app/entrypoint.sh"]