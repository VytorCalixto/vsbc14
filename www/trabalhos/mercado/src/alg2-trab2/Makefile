all: logger.o search.o sort.o
	gcc -g main.c logger.o search.o sort.o -o main -w
logger.o: logger/logger.c
	gcc -c logger/logger.c
sort.o: sort.c
	gcc -c sort.c
search.o: search.c
	gcc -c search.c
clean:
	rm -fr *.o
