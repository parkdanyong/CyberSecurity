/*
    CWE-22 예제 코드

*/


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <direct.h>
#include <limits.h>


#define MAX_STR_LEN 100


void getFileName(char* fileName, int maxLen) {
    printf("Enter the file name.\n");
    printf("input>> ");
    fgets(fileName, maxLen, stdin);
    int len = strlen(fileName);
    if (len > 0 && fileName[len-1] == '\n') fileName[len-1] = '\0'; // \n도 길이에 포함되어 있음, len-1이 개행문자 위치임
}


// 인자에 const가 붙은건 명시적으로 해당 파라미터를 수정하지 않겠다는 의미, 실제로 수정 못함
void printFileData(const char* fileName) {
    char path[_MAX_PATH] = "C:\\Users\\jeong\\Desktop\\단국대학교\\강의,과제\\3학년 2학기\\sw보안개론\\과제2\\baseDir\\CWE-22\\";
    strncat(path, fileName, _MAX_PATH - strlen(path) - 1);
    FILE* file = fopen(path, "r"); // 실패 시 NULL 반환
    if (file == NULL) {
        printf("No search file: %s\n", path);
        return;
    }
    
    printf("file path: %s\n", path);
    char str[MAX_STR_LEN];
    fgets(str, MAX_STR_LEN, file);
    printf("%s\n", str);

    fclose(file);
}



// void printFileData(const char* fileName) {
//     char cwd[_MAX_PATH];
//     if (_getcwd(cwd, _MAX_PATH) != NULL) {
//         printf("cur path: %s\n", cwd);
//         int cwdLen = strlen(cwd);
//         cwd[cwdLen] = '\\';
//         cwd[cwdLen+1] = '\0';
//     }

//     strncat(cwd, fileName, _MAX_PATH - strlen(cwd) - 1);
//     FILE* file = fopen(cwd, "r"); // 실패 시 NULL 반환
//     if (file == NULL) {
//         printf("No search file: %s\n", cwd);
//         return;
//     }
    
//     printf("file path: %s\n", cwd);
//     char str[MAX_STR_LEN];
//     fgets(str, MAX_STR_LEN, file);
//     printf("%s\n", str);

//     fclose(file);
// }


int main() {
    char fileName[20];
    int fileNameLen = 20;

    getFileName(fileName, fileNameLen);
    printFileData(fileName);

    printf("Done...\n");
    return 0;
}