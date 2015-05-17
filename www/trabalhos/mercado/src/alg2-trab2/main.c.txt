#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "logger/logger.h"
#include "search.h"
#include "sort.h"

#define TAM_MAX 256

void preencherVetor(int vetor[], int tam);
void printVetor(int vetor[]);
void sorteio(int vetor[]);
void calcularMedia();
void ordenar(int vetor[], int *compQuick, int *compQuickMed, int *compMerge);
void copiarVetor(int *fonte, int *destino, int tam);

int main(){
    srand(time(NULL));
    startLogger("log.txt");
    puts("Bem vindo ao Supermercado Algorítmico!");
    int opcao, opcaoPrint=0;
    int vetor[TAM_MAX+1];
    do{
        puts("\nO que você gostaria de fazer:");
        puts("1. Participar do sorteio");
        puts("2. Calcular média de comparações dos algoritmos");
        if(opcaoPrint)
            puts("3. Imprimir vetor do último sorteio");
        puts("0. Sair");
        scanf("%d",&opcao);
        printf("\n");

        if(opcao == 1){
            logMessage("O cliente resolveu participar do sorteio!\n");
            opcaoPrint = 1;
            sorteio(vetor);
        }
        else if(opcao == 2)
            calcularMedia();
        else if(opcao == 3){
            logMessage("Veja o vetor:\n");
            logVetor(vetor);
            printVetor(vetor);
        }
        else if(opcao != 0)
            puts("Opção inválida");
    }while(opcao != 0);

    endLogger();
    return 0;
}

void calcularMedia(){
    int vetor[TAM_MAX+1];
    int i,x,num;
    printf("Entre com um número X de vezes que os algoritmos devem ser executados:\n");
    scanf("%d",&x);
    char log[256];
    sprintf(log, "Os algoritmos de busca e ordenação serão executados %d vezes.\n", x);
    logMessage(log);

    int somaQuick=0;
    int somaQuickMed=0;
    int somaMerge=0;
    int somaSeq=0;
    int somaBin=0;

    for(i=0;i<x;i++){
        preencherVetor(vetor, TAM_MAX+1);
        num = (rand() % 512)+1;
        pesqSeq(vetor, num, TAM_MAX, &somaSeq);
        ordenar(vetor,&somaQuick,&somaQuickMed,&somaMerge);
        pesqBin(vetor, num,1, TAM_MAX, &somaBin);
    }
    printf("Média de comparações do QuickSort utilizando o 1º elemento como pivô: %d\n", somaQuick/x);
    sprintf(log,"Média de comparações do QuickSort utilizando o 1º elemento como pivô: %d\n", somaQuick/x);
    logMessage(log);
    printf("Média de comparações do QuickSort utilizando a mediana como pivô: %d\n", somaQuickMed/x);
    sprintf(log,"Média de comparações do QuickSort utilizando a mediana como pivô: %d\n", somaQuickMed/x);
    logMessage(log);
    printf("Média de comparações do MergeSort: %d\n", somaMerge/x);
    sprintf(log,"Média de comparações do MergeSort: %d\n", somaMerge/x);
    logMessage(log);
    printf("Média de comparações da pesquisa sequencial: %d\n", somaSeq/x);
    sprintf(log,"Média de comparações da pesquisa sequencial: %d\n", somaSeq/x);
    logMessage(log);
    printf("Média de comparações da pesquisa binária: %d\n", somaBin/x);
    sprintf(log,"Média de comparações da pesquisa binária: %d\n", somaBin/x);
    logMessage(log);
}

void sorteio(int vetor[]){
    int num, achouSeq=0, achouBin=0;
    preencherVetor(vetor, TAM_MAX+1);

    printf("Escolha um número entre 1 e 512:\n");
    scanf("%d",&num);
    char log[256];
    sprintf(log, "O número escolhido foi %d\n", num);
    logMessage(log);

    int compSeq = 0;
    achouSeq = pesqSeq(vetor, num, TAM_MAX, &compSeq);

    int compQuick=0;
    int compQuickMed=0;
    int compMerge=0;
    ordenar(vetor,&compQuick,&compQuickMed,&compMerge);

    int compBin = 0;
    achouBin = pesqBin(vetor, num,1, TAM_MAX, &compBin);
    if(achouSeq && achouBin){
        printf("Parabéns! Você ganhou o sorteio!\n");
        logMessage("Parabéns! Você ganhou o sorteio!\n");
    }
    else{
        printf("Infelizmente seu número não foi encontrado.\n");
        logMessage("Infelizmente seu número não foi encontrado.\n");
    }

    printf("Número comparações da pesquisa sequencial: %d\n", compSeq);
    sprintf(log,"Número comparações da pesquisa sequencial: %d\n", compSeq);
    logMessage(log);
    printf("Número comparações da pesquisa binária: %d\n", compBin);
    sprintf(log,"Número comparações da pesquisa binária: %d\n", compBin);
    logMessage(log);
    printf("Número comparações do QuickSort utilizando o 1º elemento como pivô: %d\n", compQuick);
    sprintf(log,"Número comparações do QuickSort utilizando o 1º elemento como pivô: %d\n", compQuick);
    logMessage(log);
    printf("Número comparações do QuickSort utilizando a mediana como pivô: %d\n", compQuickMed);
    sprintf(log, "Número comparações do QuickSort utilizando a mediana como pivô: %d\n", compQuickMed);
    logMessage(log);
    printf("Número comparações do MergeSort: %d\n", compMerge);
    sprintf(log, "Número comparações do MergeSort: %d\n\n", compMerge);
    logMessage(log);
}

void ordenar(int vetor[], int *compQuick, int *compQuickMed, int *compMerge){
    int auxMerge[TAM_MAX+1], vetAux[TAM_MAX+1];
    //FIXME:quick com mediana some com o numero da esq e duplica o pivo
    copiarVetor(vetor,vetAux,TAM_MAX+1);
    quickSort(vetor, 1, TAM_MAX, 1, compQuickMed);

    copiarVetor(vetAux,vetor,TAM_MAX+1);
    quickSort(vetor, 1, TAM_MAX, 0, compQuick);

    copiarVetor(vetAux,vetor,TAM_MAX+1);
    mergeSort(vetor,auxMerge,1,TAM_MAX, compMerge);
}

void copiarVetor(int *fonte, int *destino, int tam){
    int i;
    //Incrementa a posição dos ponteiros e copia o conteúdo dessa nova posição p/ a posição equivalente no outro vetor, até atingir o tamanho do vetor
    for(i=0;i<tam;i++,destino++,fonte++)
        *destino=*fonte;
}

void printVetor(int vetor[]){
    int i;
    printf("[");
    for(i=1;i<TAM_MAX;i++){
        printf("%d, ", vetor[i]);
    }
    printf("%d]\n", vetor[i]);
}

void logVetor(int vetor[]){
    int i;
    char valor[6];
    logMessage("[");
    for(i=1; i < TAM_MAX; i++){
        sprintf(valor, "%d\t", vetor[i]);
        logMessage(valor);
        if(i % 8 == 0){
            logMessage("\n");
        }
    }
    sprintf(valor, "%d]\n", vetor[i]);
    logMessage(valor);
}

void preencherVetor(int vetor[], int tam){
    int i;
    for(i=1;i<tam;i++)
        vetor[i] = (rand() % 512)+1;
}
