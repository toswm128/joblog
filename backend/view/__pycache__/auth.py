a
    i��a�  �                   @   s$   d dl mZmZ d dlZdd� ZdS )�    )�request�jsonifyNc                    sB   |j � | jddgd�� fdd��}| jddgd�� fdd	��}d S )
Nz/login�POST)�methodsc                     s4   t jdkr0t j} � �| d �}td|d��dfS d S )Nr   �idzOK!)�message�data��   )r   �method�json�	try_loginr   )�valueZ	loginUser�Zuser_service� �;/Users/macbook/Documents/GitHub/joblog/backend/view/auth.py�	loginPost   s    
z(create_auth_endpoints.<locals>.loginPostz/user�GETc                      s$   t jdkr td� �d�dd��S d S )Nr   �successZminsu10u   유저 정보 가져오기)�resultr   �msg)r   r
   r   r   r   r   r   r   �getUserToId   s    
z*create_auth_endpoints.<locals>.getUserToId)�authServices�route)�app�servicesr   r   r   r   r   �create_auth_endpoints   s
    r   )�flaskr   r   Zjwtr   r   r   r   r   �<module>   s   