FROM python:3.8-slim-buster

WORKDIR /build

COPY . /build

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]