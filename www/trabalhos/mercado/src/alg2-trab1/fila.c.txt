typedef struct ElementoFila{
	Cliente elemento;
	struct ElementoFila *prox;
}ElementoFila;

typedef struct{
	ElementoFila *frente,*final;
}Fila;

void iniciaFila(Fila *fila){
	fila->frente = (ElementoFila*)malloc(sizeof(ElementoFila));
	fila->final = fila->frente;
	fila->final->prox = NULL;
	logMessage("A fila foi iniciada.\nA fila está vazia.\n\n");
}

int vaziaFila(Fila *fila){
	return (fila->frente == fila->final);
}

void enfileira(Cliente elemento, Fila *fila){
	fila->final->prox = (ElementoFila*)malloc(sizeof(ElementoFila));
	fila->final = fila->final->prox;
	fila->final->prox = NULL;
	fila->final->elemento = elemento;
	puts("\e[32mCliente adicionado com sucesso!\e[0m");
	logMessage("Cliente ");
	logMessage(elemento.nome);
	logMessage(" entrou na fila.\n");
	logFila(*fila);
}

Cliente desenfileira(Fila *fila){
	ElementoFila *aux;
	if(vaziaFila(fila)){
		puts("\e[1;31mERRO: não é possível desenfileirar.\nMotivo: a fila está vazia.\e[0m");
		logMessage("ERRO: não é possível desenfileirar.\nMotivo: a fila está vazia.\n");
		return;
	}else{
		aux = fila->frente;
		fila->frente = fila->frente->prox;
		logMessage("Cliente ");
		logMessage(fila->frente->elemento.nome);
		logMessage(" saiu da fila.\n");
		logFila(*fila);
		free(aux);
		return fila->frente->elemento;
	}
}

void imprimeFila(Fila fila){
	if(vaziaFila(&fila)){
		puts("\e[1;31mERRO: não é possível imprimir a fila.\nMotivo: fila vazia.\e[0m");
		logMessage("ERRO: não é possível imprimir a fila.\nMotivo: fila vazia.\n");
	}else{
		ElementoFila *aux;
		printf("[ ");
		for(aux = fila.frente->prox; aux !=NULL; aux = aux->prox){
				printf("%s", aux->elemento.nome);
				if(aux->prox != NULL)
					printf(", ");
		}
		printf(" ]\n");
	}
}

void logFila(Fila fila){
	if(vaziaFila(&fila)){
		logMessage("A fila está vazia.\n");
	}else{
		logMessage("Veja a fila:\n");
		ElementoFila *aux;
		logMessage("\t[ ");
		for(aux = fila.frente->prox; aux !=NULL; aux = aux->prox){
				logMessage(aux->elemento.nome);
				if(aux->prox != NULL)
					logMessage(", ");
		}
		logMessage(" ]\n");
	}
}
