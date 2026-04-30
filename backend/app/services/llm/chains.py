from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable

# ── Chain 1: Schema Resolver ───────────────────────────────────────────────────
# Decides whether the user's query is in domain and which fields are relevant.

_SCHEMA_RESOLVER_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a pharmaceutical database schema expert.\n\n"
        "Below is the real schema of products available in our database — derived from actual documents:\n"
        "{product_schema}\n\n"
        "Analyze the user's query and determine:\n"
        "1. Is this query about pharmaceutical products (medications, drugs, supplements, OTC products)?\n"
        "2. If YES — which fields from the schema above are relevant to search on for this query?\n"
        "3. If NO — explain in the user's language that we only hold pharmaceutical product information.\n\n"
        "Return ONLY this JSON:\n"
        "{{\n"
        '  "in_domain": true or false,\n'
        '  "relevant_fields": ["field1", "field2"],\n'
        '  "out_of_domain_message": null or "<message in user\'s language>"\n'
        "}}\n\n"
        "Rules:\n"
        "- in_domain is true ONLY for pharmaceutical/medication queries.\n"
        "- relevant_fields must be actual field names taken from the schema above — nothing invented.\n"
        "- If in_domain is false, relevant_fields must be [] and out_of_domain_message must be set.\n"
        "- If in_domain is true, out_of_domain_message must be null.",
    ),
    ("human", "{user_input}"),
])


def make_schema_resolver_chain(llm) -> Runnable:
    return _SCHEMA_RESOLVER_PROMPT | llm | JsonOutputParser()


# ── Chain 2: Query Builder ─────────────────────────────────────────────────────
# Builds a MongoDB filter from the relevant fields identified by Chain 1.

_QUERY_BUILDER_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a MongoDB query builder for a pharmaceutical products database.\n\n"
        "The following fields from the product schema are relevant to the user's query:\n"
        "{relevant_fields}\n\n"
        "Build a MongoDB filter document that finds products matching the user's query.\n\n"
        "Rules:\n"
        "- Use ONLY the fields listed above — no other fields.\n"
        "- String fields: case-insensitive regex — "
        '{{"field": {{"$regex": "value", "$options": "i"}}}}\n'
        "- Array/tag fields: "
        '{{"field": {{"$in": ["value1", "value2"]}}}}\n'
        "- Boolean fields: exact match — "
        '{{"field": true}}\n'
        "- Number fields: exact or range — "
        '{{"field": {{"$lte": value}}}}\n'
        "- Combine conditions with $and or $or as needed.\n"
        "- Return ONLY a valid JSON object. Nothing else.",
    ),
    ("human", "{user_input}"),
])


def make_query_builder_chain(llm) -> Runnable:
    return _QUERY_BUILDER_PROMPT | llm | JsonOutputParser()
