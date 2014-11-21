#ifndef TAM_MAX
#error Você deve definir o tamanho máximo
#endif


typedef struct{
    Revista pilha[TAM_MAX];
    int topo; //Topo aponta para a primeira posição livre
}Pilha;

void iniciaPilha(Pilha *pilha){
    pilha->topo = 0;
    logMessage("A pilha foi iniciada.\nA pilha está vazia.\n\n");
}

int vaziaPilha(Pilha *pilha){
    return (pilha->topo == 0);
}

int tamanhoPilha(Pilha *pilha){
    return (pilha->topo);
}

void push(Pilha *pilha, Revista elemento){
    if(tamanhoPilha(pilha) == TAM_MAX){
        puts("\e[1;31mERRO: não é possivel empilhar.\nMotivo: a pilha está cheia\e[0m");
        logMessage("ERRO: não é possivel empilhar.\nMotivo: a pilha está cheia.\n");
    }else{
        pilha->pilha[pilha->topo] = elemento;
        pilha->topo++;
        logMessage("A revista ");
        logMessage(elemento.nome);
        logMessage(" foi empilhada.\n");
    }
}

Revista pop(Pilha *pilha){
    if(vaziaPilha(pilha)){
        puts("\e[1;31mERRO: não é possível desempilhar.\nMotivo: a pilha está vazia.\e[0m");
        logMessage("ERRO: não é possível desempilhar.\nMotivo: a pilha está vazia.\n");
        return;
    }else{
        Revista elemento = pilha->pilha[pilha->topo-1];
        pilha->topo--;
        logMessage("A revista ");
        logMessage(elemento.nome);
        logMessage(" foi desempilhada.\n");
        return elemento;
    }
}

void imprimePilha(Pilha *pilha){
    if(vaziaPilha(pilha)){
        puts("\e[1;31mERRO: impossível imprimir a pilha.\nMotivo: a pilha está vazia.\e[0m");
        logMessage("ERRO: impossível imprimir a pilha.\nMotivo: a pilha está vazia.\n");
    }else{
        int i;
        printf("[ ");
        for(i = 0; i < pilha->topo; i++){
            printf("%s ", pilha->pilha[i].nome);
        }
        printf("]");
    }
}

void logPilha(Pilha pilha){
    if(vaziaPilha(&pilha)){
        logMessage("A pilha está vazia.\n");
    }else{
        int i;
        logMessage("Veja a pilha:\n");
        logMessage("\t[ ");
        for(i = 0; i < pilha.topo; i++){
            logMessage(pilha.pilha[i].nome);
            if(i+1 != pilha.topo){
                logMessage(", ");
            }
        }
        logMessage(" ]\n");
    }
}
