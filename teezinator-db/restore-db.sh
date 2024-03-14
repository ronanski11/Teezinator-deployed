#!/bin/bash
set -e

# Check if your db exists or any condition to decide if mongorestore should run
DB_NAME="Teezinator-DB"

if [ -z "$(mongo --host localhost --port 27017 --eval "db.getMongo().getDBNames().indexOf('$DB_NAME')" --quiet)" ]; then
    echo "Restoring database from dump..."
    mongorestore --host localhost --port 27017 /dump

    # Add the import of user.json
    echo "Importing user.json..."
    mongoimport --host localhost --port 27017 --db $DB_NAME --collection user --file /dump/user.json --jsonArray
else
    echo "Database already exists, skipping restore."
fi
