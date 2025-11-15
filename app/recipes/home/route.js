import dotenv from 'dotenv'
dotenv.config()
const API_KEY = process.env.RECIPE_KEY
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
    try {
        const {query,offset} = await request.json()
        const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=100&offset=${offset}&apiKey=${API_KEY}`
      );

      const data = await res.json();
        return new Response(JSON.stringify({ extract: data }),{
            status:200,headers:{...corsHeaders,"Content-Type": "application/json",}
        })
    }
    catch (error) {
        return new Response(
      JSON.stringify({ error: "Server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    }
}

