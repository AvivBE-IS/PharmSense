from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable

_CORRECTION_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a pharmaceutical name standardizer. "
        "Below is the exact list of medications available in the database:\n{medication_names}\n\n"
        "The user will give you a medication name that may contain typos, abbreviations, or be written in any language. "
        "Return ONLY the single best matching name from the list above — nothing else, no explanation.",
    ),
    ("human", "{user_input}"),
])


def make_correction_chain(llm) -> Runnable:
    return _CORRECTION_PROMPT | llm | StrOutputParser()