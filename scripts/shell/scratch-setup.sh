sf org create scratch -a Flashcard -d -f orgs/unmanaged.json -v PepDevHub -y 30 --no-namespace
sf project deploy start -d force-app -o Flashcard
sf org assign permset -n Flashcard_Admin -o Flashcard
sf org open