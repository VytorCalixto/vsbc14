#ifndef LOGGER_H
#define LOGGER_H

#include <stdio.h>
#include <stdlib.h>

typedef struct{
    FILE *file; //Arquivo do log
}Logger;

Logger logger;

//Salva uma mensagem de texto no arquivo
void logMessage(char *logMsg);

//Inicia o logger abrindo o arquivo e colocando as informações iniciais.
void startLogger(char *path);

//Termina o logger desalocando da memória
void endLogger();
#endif
