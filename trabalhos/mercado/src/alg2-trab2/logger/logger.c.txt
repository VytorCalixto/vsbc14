#include "logger.h"
void logMessage(char *logMsg){
  if(logger.file != NULL){
    fprintf(logger.file, "%s", logMsg);
  }else{
    //Código para recuperar o arquivo de log
    int fd = fileno(logger.file);
    char path[512], result[512];
    sprintf(path, "/proc/self/fd/%d", fd);
    memset(result, 0, sizeof(result));
    readlink(path, result, sizeof(result)-1);
    startLogger(result);
  }
}

void startLogger(char *path){
  logger.file = fopen(path, "w");
  logMessage("=================================================\n");
  logMessage("Inicio da execucao: Supermercado Algoritmico 2.0\n");
  logMessage("Israel Barreto Sant'Anna, Vytor dos Santos Bezerra Calixto\n");
  logMessage("=================================================\n\n");
}

void endLogger(){
  logMessage("\n=================================================\n");
  logMessage("Fim da execução\n");
  fclose(logger.file);
}
