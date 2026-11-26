// crypto används för att skapa ett slumpat, unikt id till varje rätt
import crypto from "node:crypto";
// BatchWriteCommand låter oss skriva upp till 25 saker åt gången till DynamoDB
import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../src/services/db.mts";
import { menu } from "../data/menu.mts";
import type { MenuItem } from "../data/menu.mts";

const TABLE_NAME = "cantina-db";

const seedMenu = async () => {

    const items = menu.map((menuItem: MenuItem) => {
        const itemId = crypto.randomUUID().slice(0, 8);

        return {
            PK: `MENUITEM#${itemId}`,
            SK: "METADATA",

            // GSI1: alla menyrader har samma GSI1PK ("MENU"). Altså kan vi hämta hela mneyn med query: GSI1PK = "MENU".
            // GSI1SK = kategorin. Så vi kan hämta bara mat eller bara dryck med: GSI1SK = "CATEGORY#food" eller "CATEGORY#drinks".
            GSI1PK: "MENU",
            GSI1SK: `CATEGORY#${menuItem.category}`,

            ...menuItem,

            itemId,
            createdAt: new Date().toISOString()
        };
    });

    for (let i = 0; i < items.length; i += 25) {
        const batch = items.slice(i, i + 25);

        await db.send(
            new BatchWriteCommand({
                RequestItems: {
                    // Tabellnamnet är nyckeln, värdet är en lista med "lägg in"-förfrågningar
                    [TABLE_NAME]: batch.map(item => ({
                        PutRequest: {
                            Item: item
                        }
                    }))
                }
            })
        );

        console.log(`Inserted ${batch.length} menu items`);
    }

    console.log(`Done! Seeded ${items.length} menu items.`);
};

seedMenu();
