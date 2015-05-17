#include "sort.h"

void mergeSort(int vetor[], int vetAux[], int esq, int dir, int *nComp){
    int i,j,k,meio;
    if(dir > esq){
        meio = (dir+esq)/2;
        mergeSort(vetor, vetAux, esq, meio, nComp);
        mergeSort(vetor, vetAux, meio+1, dir, nComp);
        for(i=meio+1;i>esq;i--){
            vetAux[i-1]=vetor[i-1];
            (*nComp)++;
        }
        for(j=meio;j<dir;j++){
            vetAux[dir+meio-j]=vetor[j+1];
            (*nComp)++;
        }
        for(k=esq;k<=dir;k++)
            vetor[k]= (vetAux[i] < vetAux[j]) ? vetAux[i++] : vetAux[j--];
    }
}

int mediana(int a, int b, int c){
    if ((a - b) * (c - a) >= 0)
        return a;
    else if ((b - a) * (c - b) >= 0)
        return b;
    else
        return c;
}

void particao(int vetor[], int esq, int dir, int *posPivo, int tipoParticao, int *nComp){
    int i, j, pivo, aux;
    //Se tipoParticao > 0, usa a mediana. Se não, pega o primeiro elemento
    pivo = (tipoParticao != 0) ? mediana(vetor[esq], vetor[(esq+dir)/2], vetor[dir]) : vetor[esq];
    i = esq;
    j = dir;
    while(i < j){
        while((vetor[i] <= pivo) && (i < dir)){
            (*nComp)++;
            i++;
        }
        while(vetor[j] > pivo){
            (*nComp)++;
            j--;
        }
        if(i < j){
            aux = vetor[j];
            vetor[j] = vetor[i];
            vetor[i] = aux;
        }
    }
    vetor[esq] = vetor[j];
    vetor[j] = pivo;
    *posPivo = j;
}

void quickSort(int vetor[], int esq, int dir, int tipoParticao, int *nComp){
   int posPivo;
   if(esq < dir){
        (*nComp)++;
        particao(vetor, esq, dir, &posPivo, tipoParticao, nComp);
        quickSort(vetor, esq, posPivo - 1, tipoParticao, nComp);
        quickSort(vetor, posPivo + 1, dir, tipoParticao, nComp);
   }
}
