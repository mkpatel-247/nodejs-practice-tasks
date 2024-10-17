# Installation of mongoDB using docker.

### Below are the command to install mongoDB.

**Note:** Below are the command to check is docker and docker-compose are installed in the system or not.

```
docker -v
docker-compose -v
```

### Below command will up the docker-compose.yml

`docker-compose up -d`

## Install robo3T

### Installation of Robo 3T using snap packages in ubuntu.

```
sudo apt update
sudo apt install snapd
sudo snap install robo3t-snap
robo3t-snap
```

### you should start with this command also when your robo3t is installed but not start on Ubuntu linux

`DISABLE_WAYLAND=1 robo3t-snap`
