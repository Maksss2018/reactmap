==========================For cloude9 ==========================
to start  make sure that mongoDB is shutdown correctly if it is not,  delete filese ./data/* ,./mongod
and then put next comand in  commond line from ./
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
  then :
    $  ./mongod
  after this  you can start Node.js
  $ node server.js
and only after this:
   $ cd postcode 
   $ npm run start 
