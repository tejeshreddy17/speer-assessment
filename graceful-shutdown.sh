#!/bin/bash

loop_condition=true  # Set initial condition

while "$loop_condition"; do
  # Find the process ID (PID) and save it to a temporary file
  ps -ef | grep 'dist/src/main' | awk '{print $2}' > /tmp/test_server.pid

  # Check if the file is not empty
  if [ -s /tmp/test_server.pid ]; then
    # Remove the last two lines from the file using sed
    sed -i '$d' /tmp/test_server.pid
    sed -i '$d' /tmp/test_server.pid

    # Read the PID from the file
    read -r pid < /tmp/test_server.pid

    # Check if the process is running
    if kill -0 "$pid" 2>/dev/null; then
      # Send a graceful termination signal
      kill -15 "$pid"
      echo "Graceful shutdown initiated for process $pid"
    else
      loop_condition=false
      echo "Process with PID $pid is not running"
    fi
  else
    loop_condition=false
    echo "No running processes found."
  fi
done
