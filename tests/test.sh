echo "Should work:"
ipToHost /root/hosts.txt
echo "Should work:"
ipToHost hosts.txt
echo "Should break:"
ipToHost 192.168.1.0
echo "Should work:"
ipToHost 216.58.217.46
echo "Should break:"
ipToHost
