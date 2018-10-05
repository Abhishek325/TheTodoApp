#TheTodoApp
Basic todo app built on hybrid mobile application framework ionic (3.9.2)

1. API is lcoated in the path "/service". Its a PHP based WebAPI which can be hosted at any server            configured with Apache and Mysql for database.
   To configure the connectionString, navigate to /service/Engine/Prote/config.php and change the values on line 53,53 and 54. 
   Once the connectionString is ready, hit URL /install (with the service as root) and it will add the required table(s) to your database.

2. You will need to get latest node_modules in the main project as dependencies have been exluded from the    version control.

3. To add any platform, follow the commands based on `cordova` (You can read more about it [here](https://cordova.apache.org/))

4. Once you are ready with the packages, plugins and platform(s), use the below command to run the project:
   `ionic cordova run <patform>`

*The project is still under development. A lot of changes and optmizations to come up with. Feel free to suggest any here or reach me [iamtheking1abhishek@gmail.com](mailto:iamtheking1abhishek@gmail.com)* 
