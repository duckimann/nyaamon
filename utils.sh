#!/bin/bash

case $1 in

	build)
		docker build -t nyaamon .;
		;;

	testbuild)
		docker compose down; docker rmi nyaamon;
		docker build -t nyaamon .;
		docker compose up -d;
		docker logs --tail 50 --follow --timestamps nyaamon;
		;;

	*)
		echo -n "Unknown Command Param."
		;;
esac