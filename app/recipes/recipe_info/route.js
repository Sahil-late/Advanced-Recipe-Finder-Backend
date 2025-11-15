import dotenv from 'dotenv'
dotenv.config()
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PUT,DELETE,GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}
export async function POST(req) {
    try {      
        const API_KEY = process.env.RECIPE_KEY  
        let id = await req.json()        
        const res = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
        );
        let data = await res.json()
        return new Response(JSON.stringify({ extract: data }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
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