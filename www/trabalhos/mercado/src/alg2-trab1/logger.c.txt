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

void logMessage(char *logMsg){
  if(logger.file != NULL){
    fprintf(logger.file, "%s", logMsg);
  }else{
    startLogger("log.txt");
  }
}

void startLogger(char *path){
  logger.file = fopen(path, "w");
  logMessage("=================================================\n");
  logMessage("Inicio da execucao: Supermercado Algoritmico\n");
  logMessage("Israel Barreto Sant'Anna, Vytor dos Santos Bezerra Calixto\n");
  logMessage("=================================================\n\n");
}

void endLogger(){
  logMessage("\n=================================================\n");
  logMessage("Fim da execução\n");
  fclose(logger.file);
}
