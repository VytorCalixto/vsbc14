#include "search.h"

int pesqSeq(int vetor[], int valor, int tamVetor, int *nComp){
    int posicao = tamVetor;
    vetor[0] = valor;
    while(vetor[posicao] != valor){
    	(*nComp)++;
        posicao--;
    }
    (*nComp)++;
    return posicao;
}

int pesqBin(int vetor[], int valor, int esq, int dir, int *nComp){
	int meio;
	if(esq > dir){
		(*nComp)++;
		return 0;
	}
	meio = (esq+dir)/2;
	if(vetor[meio]==valor){
		(*nComp)++;
		return meio;
	}
	if(valor < vetor[meio]){
		(*nComp)++;
		return pesqBin(vetor,valor,esq,meio-1,nComp);
	}
	else{
		(*nComp)++;
		return pesqBin(vetor,valor,meio+1,dir,nComp);
	}
}
