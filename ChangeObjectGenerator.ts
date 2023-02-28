
interface Catalog {
    id: string;
    name: string;
    creationDate: Date;
}

interface Item {
    id: number;
    item: string;
    insertionDate: Date;
}

class Dexie {
    onPopulate() {
        console.log("populate");
    }
}

interface DatabaseTables {
    items: Item[];
    catalog: Catalog[];
}

class Database  extends Dexie implements DatabaseTables {
    catalog: Catalog[] = [];
    items: Item[] = []
}

type DeclaredTables = keyof DatabaseTables;
type TableIdType<TTableName extends DeclaredTables> = Database[TTableName][0]['id']
type TableProps<TTableName extends DeclaredTables> = keyof Database[TTableName][0]
type TablePropType<TTableName extends DeclaredTables, Prop extends keyof Database[TTableName][0]> = Database[TTableName][0][Prop]

type GenerateChange<TTableName extends DeclaredTables> = ({
    [Prop in TableProps<TTableName>]: {
        objectName: TTableName,
        id: TableIdType<TTableName>
        propertyName: Prop,
        newValue: TablePropType<TTableName, Prop>,
        oldValue: TablePropType<TTableName, Prop>
    }
})[TableProps<TTableName>];


class ChangeService {
    pushChange<TTableName extends DeclaredTables>(change: GenerateChange<TTableName>){
        console.log(`New Change for object ${change.objectName} \r\n Property '${change.propertyName.toString()}' is now ${change.newValue}`);
    }
}

const changeService = new ChangeService();

changeService.pushChange({
    objectName: "catalog",
    id: "sup",
    propertyName: "name",
    newValue: "Hello",
    oldValue: "By"
});


changeService.pushChange({
    objectName: "items",
    id: 45,
    propertyName: "insertionDate",
    newValue: new Date(),
    oldValue: new Date(2020,1,1)
});
