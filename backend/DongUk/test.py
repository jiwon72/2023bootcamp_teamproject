import requests
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import pandas as pd


headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}


def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--lang=ko_KR')
    
    # headless임을 숨기기 위해서
    # headless인 경우 Cloudflare 서비스가 동작한다.
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")

    driver = webdriver.Chrome(service=Service(
        ChromeDriverManager().install()), options=chrome_options)
    return driver

def extract_string(url):
    # 뒤에서부터 첫 번째 '/'와 두 번째 '/'의 인덱스를 찾습니다.
    last_slash_index = url.rfind('/')
    second_last_slash_index = url.rfind('/', 0, last_slash_index)

    # 두 번째 '/' 뒤의 문자열을 추출합니다.
    extracted_string = url[second_last_slash_index + 1:last_slash_index]
    return extracted_string


def get_provider_name():
    url = "https://www.justwatch.com/kr/"  # JustWatch의 인기 영화 페이지 URL
    # HTTP 요청을 보내서 페이지 내용 가져오기
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print("상태" + str(response.status_code))
        print("페이지를 가져올 수 없습니다.")
        return

    # BeautifulSoup을 사용하여 페이지 파싱
    soup = BeautifulSoup(response.text, "html.parser")
    # 영화 정보가 있는 요소를 찾아서 리스트에 저장
    movie_elements = soup.select(".provider-icon > img")
    provider_names = []
    for movie_element in movie_elements:
        provider_name = movie_element['title']
        if provider_name:
            provider_names.append(provider_name)

    return provider_names


def get_movie_names(provider_name):
    provider_name=provider_name.replace(" ","-")
    # hormeDriver를 통해서 html 소스 불러오기
    url = "https://www.justwatch.com/kr/%EB%8F%99%EC%98%81%EC%83%81%EC%84%9C%EB%B9%84%EC%8A%A4/"+provider_name+"/"
    driver = set_chrome_driver()
    driver.get(url=url)

    #스크롤 수행
    # 스크롤 다운을 몇 번 수행할지 결정 (예: 5번)
    for _ in range(3):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)  # 스크롤 다운 후 페이지 로딩 대기
        
    
    html = driver.page_source

    # BeautifulSoup을 사용하여 페이지 파싱
    soup = BeautifulSoup(html, "html.parser")
    # 채널별 영화,드라마 목록
    # movie_elements = soup.select(".title-list-grid__item--link")
    movie_img_elements = soup.select(".picture-comp__img")
    movie_title_list = [] 
    for movie_img_element in movie_img_elements:
        movie_name_v2=movie_img_element['alt']
        movie_title_list.append(movie_name_v2)
        
    #for eng title about movie
    movie_elements = soup.select(".title-list-grid__item--link")
    movie_eng_list = []
    for movie_img_element in movie_img_elements:
        movie_name_v2=movie_img_element['href']+"/"
        
        movie_eng_list.append(extract_string(movie_name_v2))
    
    return movie_eng_list, movie_eng_list

def get_movie_links(provider_name):
     provider_name=provider_name.replace(" ","-")
    # hormeDriver를 통해서 html 소스 불러오기
    url = "https://www.justwatch.com/kr/%EB%8F%99%EC%98%81%EC%83%81%EC%84%9C%EB%B9%84%EC%8A%A4/"+provider_name+"/"
    driver = set_chrome_driver()
    driver.get(url=url)   
    html = driver.page_source

    # BeautifulSoup을 사용하여 페이지 파싱
    soup = BeautifulSoup(html, "html.parser")
    # 채널별 영화,드라마 목록
    # movie_elements = soup.select(".title-list-grid__item--link")
    movie_img_elements = soup.select(".title-list-grid__item--link")
    movie_list = []
    # for movie_element in movie_elements:
    #     movie_name=extract_string( movie_element['href']+"/")
    #     if movie_name:
    #         movie_list.append(movie_name)
    
    for movie_img_element in movie_img_elements:
        movie_name_v2=movie_img_element['href']+"/"
        
        movie_list.append(extract_string(movie_name_v2))
    
    return movie_list


def crawl_movies():
    result = {}
    provider_names = get_provider_name() 
    print(provider_names)
    for provider_name in provider_names:
        result[provider_name] = get_movie_names(provider_name)
        time.sleep(0.5)
    return result


if __name__ == "__main__":
    # movies = crawl_movies()
    movies = crawl_movies()
    # pandas DataFrame으로 변환
    df = pd.DataFrame.from_dict(movies, orient='index').transpose()

    # 엑셀 파일로 저장
    df.to_excel('movies.xlsx', index=True)
