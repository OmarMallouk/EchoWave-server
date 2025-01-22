import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize
from sklearn.metrics.pairwise import cosine_similarity

file_path = r"./newSimilarityDataset.csv"

def get_lyrics_similarity(query_lyrics, top_n=2, max_lyric_length=200):
    df = pd.read_csv(file_path, usecols=['artist_name', 'track_name', 'lyrics'])
    
    vectorizer = TfidfVectorizer()
    lyrics_vectors = vectorizer.fit_transform(df['lyrics'])
    normalized_vectors = normalize(lyrics_vectors)
    
    query_vector = vectorizer.transform([query_lyrics])
    normalized_query_vector = normalize(query_vector)
    
    similarities = cosine_similarity(normalized_query_vector, normalized_vectors).flatten()
    top_indices = similarities.argsort()[-top_n:][::-1]
    
    results = []
    for idx in top_indices:
        similarity_percentage = similarities[idx] * 100
        lyric = df.iloc[idx]['lyrics']
        artist = df.iloc[idx]['artist_name']
        track = df.iloc[idx]['track_name']
        
        truncated_lyric = lyric[:max_lyric_length]
        if len(lyric) > max_lyric_length:
            truncated_lyric = truncated_lyric.rsplit(' ', 1)[0]  #This is used to avoid cutting off words
        
        results.append({
            "similarity": similarity_percentage, 
            "lyric": truncated_lyric, 
            "artist": artist, 
            "track": track
        })
    
    return results