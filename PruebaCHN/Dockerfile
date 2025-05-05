FROM maven:latest as build

WORKDIR /app

COPY pom.xml /app/
COPY src /app/src/

RUN mvn clean package 

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/*.jar /app/mi-aplicacion.jar

EXPOSE 8080

CMD ["java", "-jar", "mi-aplicacion.jar"]
