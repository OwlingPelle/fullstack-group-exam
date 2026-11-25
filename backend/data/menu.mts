// Typen beskriver hur EN maträtt eller dryck ser ut i vår data-fil.
// Category får bara vara "food" eller "drinks". TypeScript säger ifrån om man skriver fel.
export type MenuItem = {
    title: string;
    category: "food" | "drinks";
    description: string;
    price: number; 
    image: string; 
};

// Början av alla bild-URL:er. Den är samma för alla bilder,
// så vi skriver den en gång här i stället för i varje rätt.
const IMAGE_URL = "https://cantina-images-338184107928-eu-north-1-an.s3.eu-north-1.amazonaws.com";

// OBS: Priserna nedan är förslag. Byt till era riktiga priser.
// OBS: Bildnamnen måste stämma exakt med filnamnen i S3 (även .jpg/.png).

export const menu: MenuItem[] = [
    // ---------- MAT ----------
    {
        title: "Lava Planet Burger",
        category: "food",
        description: "Het burgare med chipotlemajo i rött bröd.",
        price: 159,
        image: `${IMAGE_URL}/food/lava-planet-burger.jpg`
    },
    {
        title: "Swamp Planet Stew",
        category: "food",
        description: "Grön linsgryta med spenat och rotfrukter.",
        price: 139,
        image: `${IMAGE_URL}/food/swamp-planet-stew.jpg`
    },
    {
        title: "Sea Planet Gumbo",
        category: "food",
        description: "Krämig skaldjurssoppa med saffran.",
        price: 169,
        image: `${IMAGE_URL}/food/sea-planet-gumbo.jpg`
    },
    {
        title: "Bounty Hunter Ribs",
        category: "food",
        description: "BBQ-revben med coleslaw.",
        price: 189,
        image: `${IMAGE_URL}/food/bounty-hunters-ribs.jpg`
    },
    {
        title: "Death Moon Meatball",
        category: "food",
        description: "En stor köttbulle på potatismos med gräddsås.",
        price: 149,
        image: `${IMAGE_URL}/food/death-moon-meatball.jpg`
    },
    {
        title: "Hyper Space Noodles",
        category: "food",
        description: "Ramen med ”stjärnstrimmor” av morot och vårlök.",
        price: 149,
        image: `${IMAGE_URL}/food/hyper-space-noodles.jpg`
    },
    {
        title: "Hutty Roast Beef",
        category: "food",
        description: "Rostbiff med rostade rotfrukter och rödvinssky.",
        price: 199,
        image: `${IMAGE_URL}/food/hutty-roast-beef.jpg`
    },
    {
        title: "Droid Parts Pasta",
        category: "food",
        description: "Fusilli med pesto och rostade nötter.",
        price: 139,
        image: `${IMAGE_URL}/food/droid-parts-pasta.jpg`
    },
    {
        title: "Rebel Wraps",
        category: "food",
        description: "Wraps med falafel, picklad lök och myntayoghurt.",
        price: 129,
        image: `${IMAGE_URL}/food/rebel-wraps.jpg`
    },
    {
        title: "Sand Dunes Tacos",
        category: "food",
        description: "Tacos med kryddig färs och majssalsa.",
        price: 139,
        image: `${IMAGE_URL}/food/sand-dunes-tacos.jpg`
    },

    // ---------- DRYCK ----------
    {
        title: "Blue Milk",
        category: "drinks",
        description: "Krämig, iskall blå mjölkdryck med len och söt smak.",
        price: 59,
        image: `${IMAGE_URL}/drinks/blue-milk.jpg`
    },
    {
        title: "Twins Suns Sunset",
        category: "drinks",
        description: "Fruktig och uppfriskande citrusdrink i orange och rosa nyanser.",
        price: 65,
        image: `${IMAGE_URL}/drinks/twin-sun-sunset.jpg`
    },
    {
        title: "Solar Flare Fizz",
        category: "drinks",
        description: "Bubblande citronläsk med frisk mynta och massor av is.",
        price: 49,
        image: `${IMAGE_URL}/drinks/solar-flare-fizz.jpg`
    },
    {
        title: "Nebula Berry Blast",
        category: "drinks",
        description: "Läskande lila bärdrink med björnbär, hallon och blåbär.",
        price: 59,
        image: `${IMAGE_URL}/drinks/nebula-berry-blast.jpg`
    },
    {
        title: "Desert Spice Elixir",
        category: "drinks",
        description: "Iskallt kryddigt te med kanel, apelsin och en hint av stjärnanis.",
        price: 49,
        image: `${IMAGE_URL}/drinks/desert-spice-elixir.jpg`
    },
    {
        title: "Swamp Moon Spritz",
        category: "drinks",
        description: "Intensivt grön och bubblande limedrink med färsk mynta.",
        price: 55,
        image: `${IMAGE_URL}/drinks/swamp-moon-spritz.jpg`
    },
    {
        title: "Golden Galaxy Lassi",
        category: "drinks",
        description: "Len och krämig mangolassi med yoghurt och kardemumma.",
        price: 59,
        image: `${IMAGE_URL}/drinks/golden-galaxy-lassi.jpg`
    },
    {
        title: "Hyperdrive Mocha",
        category: "drinks",
        description: "Iskall kaffedryck med choklad, mjölk och fluffig grädde.",
        price: 59,
        image: `${IMAGE_URL}/drinks/hyperdrive-mocha.jpg`
    },
    {
        title: "Rebel Fizz",
        category: "drinks",
        description: "Rubinröd, bubblande drink med körsbär och tranbär.",
        price: 49,
        image: `${IMAGE_URL}/drinks/rebel-fizz.jpg`
    },
    {
        title: "Dark Side Shake",
        category: "drinks",
        description: "Fyllig chokladmilkshake med vispad grädde och chokladsås.",
        price: 69,
        image: `${IMAGE_URL}/drinks/dark-side-shake.jpg`
    }
];
