# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

	# Every Vagrant virtual environment requires a box to build off of.
	config.vm.box = "CentOS64"
	config.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box"

	# Assign this VM to a host-only network IP, allowing you to access it
	# via the IP. Host-only networks can talk to the host machine as well as
	# any other machines on the same network, but cannot be accessed (through this
	# network interface) by any external networks.
	config.vm.network :private_network, ip: "192.168.56.151"
	config.vm.network "forwarded_port", guest: 80, host: 8080
	config.vm.network "forwarded_port", guest: 3306, host: 3306 # mysql
	config.vm.network "forwarded_port", guest: 6380, host: 6380 # redis
	config.vm.network "forwarded_port", guest: 11211, host: 11211 # memcached
	config.vm.hostname = "crispin.dev"

	config.vm.synced_folder "./vagrant", "/vagrant", :owner => "vagrant", :group => "vagrant"
	config.vm.synced_folder "./app", "/srv/crispin/app", nfs: true#, :owner => "vagrant", :group => "vagrant"
	config.vm.synced_folder "./vagrant/logs", "/opt/log", nfs: true#, :owner => "vagrant", :group => "vagrant"


	config.vm.provider :virtualbox do |virtualbox|
		virtualbox.customize ["modifyvm", :id, "--name", "crispin"]
		virtualbox.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
		virtualbox.customize ["modifyvm", :id, "--memory", "512"]
		virtualbox.customize ["setextradata", :id, "--VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
	end

	config.vm.provision :puppet,
		:options => ["--fileserverconfig=fileserver.conf --verbose"],
		:facter => { "fqdn" => "vagrant.vagrantup.com" }  do |puppet|
			puppet.manifests_path = "vagrant/puppet/manifests"
			puppet.module_path = "vagrant/puppet/modules"
	end

end
