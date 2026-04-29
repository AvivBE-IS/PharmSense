import logging
from typing import Dict, List, Optional

from app.services.chat.retriever import ContextLoader, RetrievedChunk, TextSearchRetriever

logger = logging.getLogger(__name__)

# Graceful no-results fallback messages per locale
_NO_RESULTS_FALLBACK: Dict[str, str] = {
    "en": (
        "I couldn't find specific records about this in my knowledge base. "
        "Based on general pharmaceutical knowledge: please consult a licensed pharmacist "
        "or physician for personalized medical advice.\n\n"
        "⚕️ This response is for informational purposes only and does not replace professional medical consultation."
    ),
    "he": (
        "לא מצאתי מידע ספציפי על כך במאגר הידע שלי. "
        "בהתבסס על ידע פרמצבטי כללי: מומלץ להתייעץ עם פרמצבט מורשה "
        "או רופא לקבלת ייעוץ רפואי מותאם אישית.\n\n"
        "⚕️ תשובה זו מיועדת למטרות מידע בלבד ואינה מחליפה ייעוץ רפואי מקצועי."
    ),
    "ar": (
        "لم أجد معلومات محددة حول هذا الموضوع في قاعدة معارفي. "
        "استناداً إلى المعرفة الصيدلانية العامة: أنصحك باستشارة صيدلاني مرخص "
        "أو طبيب للحصول على مشورة طبية شخصية.\n\n"
        "⚕️ هذه الإجابة لأغراض المعلومات فقط ولا تُغني عن الاستشارة الطبية المتخصصة."
    ),
    "ru": (
        "Я не нашёл конкретной информации об этом в своей базе знаний. "
        "На основе общих фармацевтических знаний: рекомендую проконсультироваться "
        "с лицензированным фармацевтом или врачом.\n\n"
        "⚕️ Этот ответ предназначен только для информационных целей и не заменяет профессиональную медицинскую консультацию."
    ),
}


class ChatService:
    DATA_SOURCE_LABEL = "Local Context"

    def __init__(self) -> None:
        loader = ContextLoader()
        self._retriever = TextSearchRetriever(loader)

    def _no_results_message(self, locale: Optional[str]) -> str:
        """Return a graceful fallback in the user's language."""
        lang = (locale or "en").split("-")[0].lower()
        return _NO_RESULTS_FALLBACK.get(lang, _NO_RESULTS_FALLBACK["en"])

    def _generate_reply(self, message: str, retrieved: List[RetrievedChunk], locale: Optional[str] = None) -> str:
        if not retrieved:
            return self._no_results_message(locale)
        top = retrieved[0]
        source_list = ", ".join(f"{r.source} ({r.score:.0%})" for r in retrieved)
        return (
            f"Based on the local knowledge base, here is what I found:\n\n"
            f"{top.text}\n\n"
            f"— Sources consulted: {source_list}"
        )

    def respond(self, message: str, locale: Optional[str] = None) -> dict:
        retrieved = self._retriever.retrieve(message)
        reply = self._generate_reply(message, retrieved, locale=locale)
        return {
            "reply": reply,
            "sources": [
                {
                    "source": r.source,
                    "snippet": r.text[:140].rstrip() + ("…" if len(r.text) > 140 else ""),
                    "relevance_score": r.score,
                }
                for r in retrieved
            ],
            "data_source": self.DATA_SOURCE_LABEL,
        }


_chat_service: Optional[ChatService] = None


def get_chat_service() -> ChatService:
    global _chat_service
    if _chat_service is None:
        _chat_service = ChatService()
    return _chat_service
