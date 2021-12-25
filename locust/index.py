from locust import HttpUser, task, between


class User(HttpUser):
    wait_time = between(0.5, 2)

    @task
    def visit_homepage(self):
        self.client.get("/")
