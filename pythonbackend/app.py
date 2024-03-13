


from flask import Flask, request, jsonify 
from PyPDF2 import PdfReader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
import os
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
import logging
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
secret_key = os.getenv("SECRET_KEY")
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from the API'}
    return jsonify(data)

@app.route('/api/data/pdf',methods=['POST'])
def get_pdf():
    
    os.environ["OPENAI_API_KEY"] =secret_key
   
   
    if 'file' not in request.files:
        return jsonify({'error':'invalid data'})
    
    pdf = PdfReader(request.files['file'])
    text = ""
    
    for i,page in enumerate(pdf.pages):
        content = page.extract_text()
        if content:
            text += content
  
    text_splitter = CharacterTextSplitter(
        separator = "\n",
        chunk_size = 800,
        chunk_overlap = 200,
        length_function = len,
    )

    chunks = text_splitter.split_text(text=text)

    embeddings = OpenAIEmbeddings()

    VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
    #chain = load_qa_chain(OpenAI(),chain_type="stuff")
    chain = load_qa_chain(OpenAI(model="gpt-3.5-turbo-instruct"),chain_type="stuff")  
    #print(request.data.code("UTF-8"))
    # query = "give whole  "+"educations "+" mentioned in only EDUCATIONS section pointwise answers  dont add extra info other then achivement section"
    # query = "what degree has been persued by studnt"
    # query="what are achivements mentioned in achivements section give  only achivements "
    query = request.form['data']
    docs = VectorStore.similarity_search(query)
    message = chain.run(input_documents=docs,question=query) 
    return jsonify({'message': message})

if __name__ == '__main__':
    app.run(debug=True)




    
