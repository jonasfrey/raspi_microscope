// add.c
int add(int a, int b) {
  return a + b;
}
// // unix
// cc -c -o add.o add.c
// cc -shared -W -o libadd.so add.o
// // Windows
// cl /LD add.c /link /EXPORT:add