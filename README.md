### Configure Apache/Nginx
 If the application is mapped under a path like: /data-and-maps/pam it needs to have configured a header called **pam_path**

 * Apache:
       RequestHeader set pam_path '/data-and-maps/pam' nginx:
 * nginx:
        proxy_set_header pam_path '/data-and-maps/pam'
