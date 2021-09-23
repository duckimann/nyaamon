function nyaamon() {
	case $1 in
		log)
			less ~/nyaamon/log.txt;
			;;

		delLog)
			echo "" > ~/nyaamon/log.txt;
			;;

		restart)
			sudo systemctl daemon-reload && sudo systemctl start nyaamon && sudo systemctl status nyaamon;
			;;
		disable)
			sudo systemctl disable nyaamon;
			;;
		enable)
			sudo systemctl enable nyaamon;
			;;
		start)
			sudo systemctl start nyaamon;
			;;
		stop)
			sudo systemctl stop nyaamon;
			;;
		status)
			sudo systemctl status nyaamon;
			;;
		*)
			echo "log | delLog | start | stop | restart | disable | enable";
			;;
	esac
}
