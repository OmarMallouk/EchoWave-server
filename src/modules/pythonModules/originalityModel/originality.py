import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize
from sklearn.metrics.pairwise import cosine_similarity

file_path = r"C:\Users\amer\Desktop\small_dataset.csv"

def get_lyrics_similarity(query_lyrics):
    df = pd.read_csv(file_path, usecols=['lyrics'])
    vectorizer = TfidfVectorizer()
    lyrics_vectors = vectorizer.fit_transform(df['lyrics'])
    normalized_vectors = normalize(lyrics_vectors)
    
    query_vector = vectorizer.transform([query_lyrics])
    normalized_query_vector = normalize(query_vector)
    
    similarities = cosine_similarity(normalized_query_vector, normalized_vectors).flatten()
    top_indices = similarities.argsort()[-2:][::-1]  # Top 2 similar lyrics
    
    results = []
    for idx in top_indices:
        similarity_percentage = similarities[idx] * 100
        lyric = df.iloc[idx]['lyrics']
        results.append({"similarity": similarity_percentage, "lyric": lyric})
    
    return results
