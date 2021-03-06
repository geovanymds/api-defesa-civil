up:
	docker-compose up
stop:
	docker-compose stop
down:
	docker-compose down
api:
	docker exec -it api-imobiliaria /bin/sh
db:
		docker exec -it db-imobiliaria mongo --authenticationDatabase admin --host db --port 27017
rabbit:
	docker exec -it rabbitmq /bin/sh