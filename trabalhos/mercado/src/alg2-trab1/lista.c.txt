typedef struct{
	Produto *vetor;
	int final;
}Lista;

void iniciaLista(Lista *lista){
	lista->vetor = (Produto *) malloc(sizeof(Produto));
	lista->final = 0;
	logMessage("A lista foi iniciada.\nA lista está vazia.\n\n");
}

int vaziaLista(Lista *lista){
	return (lista->final == 0);
}

void insereLista(Lista *lista, Produto elemento){
	Produto *aux = (Produto *) realloc(lista->vetor, sizeof(Produto)*(lista->final+1));
	if(aux){
		lista->vetor = aux;
		lista->vetor[lista->final] = elemento;
		lista->final++;

		puts("\e[32mItem adicionado com sucesso!\e[0m");
		logMessage("Item ");
		logMessage(elemento.nome);
		logMessage(" (x");
		char qtd[10];
		snprintf(qtd, sizeof(qtd), "%d", elemento.quantidade);
		logMessage(qtd);
		logMessage(") foi adicionado a lista de compras.\n");
		logLista(lista);
	}else{
		puts("\e[1;31mERRO: não é possível inserir.\nMotivo: erro na alocação do vetor.\e[0m");
		logMessage("ERRO: não é possível inserir.\nMotivo: erro na alocação do vetor.\n");
	}
}

Produto removeLista(Lista *lista, int posicao){
	if(vaziaLista(lista)){
		puts("\e[1;31mERRO: não é possível remover.\nMotivo: a lista está vazia.\e[0m");
		logMessage("ERRO: não é possível remover.\nMotivo: a lista está vazia.\n");
		return;
	}else if(posicao >= lista->final){
		puts("\e[1;31mERRO: não é possível remover.\nMotivo: posição maior do que o tamanho da lista.\e[0m");
		logMessage("ERRO: não é possível remover.\nMotivo: posição maior do que o tamanho da lista.\n");
		return;
	}else{
		int i;
		Produto aux = lista->vetor[posicao];
		for(i=posicao; i+1 <= lista->final-1; i++){
			lista->vetor[i] = lista->vetor[i+1];
		}
		lista->final--;
		//Realoca para uma variável auxiliar. Caso ocorra um erro, o lista->vetor não será perdido.
		Produto *auxAlloc = (Produto *) realloc(lista->vetor, sizeof(Produto)*(lista->final)+1);
		if(auxAlloc){
			lista->vetor = auxAlloc;
		}
		logMessage("Item ");
		logMessage(aux.nome);
		logMessage(" foi removido da lista de compras.\n");
		logLista(lista);
		return aux;
	}
}

void imprimeLista(Lista *lista){
	if(vaziaLista(lista)){
		puts("\e[1;31mERRO: impossível imprimir lista.\nMotivo: a lista está vazia.\e[0m");
		logMessage("ERRO: impossível imprimir lista.\nMotivo: a lista está vazia.\n");
	}else{
		int i;
		for(i=0;i<lista->final;i++){
			printf("\t%d. %s x%d\n", i+1, lista->vetor[i].nome, lista->vetor[i].quantidade);
		}
	}
}

void logLista(Lista *lista){
	if(vaziaLista(lista)){
		logMessage("A lista está vazia.\n");
	}else{
		int i;
		logMessage("Veja a lista:\n");
		for(i=0; i<lista->final; i++){
			char indice[10];
			snprintf(indice, sizeof(indice), "%d", i+1);
			logMessage("\t");
			logMessage(indice);
			logMessage(". ");
			logMessage(lista->vetor[i].nome);
			logMessage(" x ");
			char qtd[10];
			snprintf(qtd, sizeof(qtd), "%d", lista->vetor[i].quantidade);
			logMessage(qtd);
			logMessage("\n");
		}
	}
}
