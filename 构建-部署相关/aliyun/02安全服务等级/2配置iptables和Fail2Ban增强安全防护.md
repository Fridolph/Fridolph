## iptables 

允许灵活配置的防火墙框架

更新 ubuntu -> sudo apt-get update && sudo apt-get upgrade

---

iptables -F

sudo vi /etc/iptables.up.rules   i

```bash
*filter
# allow all connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
# allow out traffic
-A OUTPUT -j ACCEPT
# allow http https 
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT
# allow ssh port login 
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT
# allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
# log denied calls
-A INPUT -m limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7
# reject all other inbound
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```