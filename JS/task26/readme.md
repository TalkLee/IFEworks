#2016.4.11

问题组织：

- universe
    + airship
        - motive_sys
            + fly()
            + stop()
        - power_sys
            + get_sunshine()
        - signal_sys
            + get_signal()
        - explode_sys
            + delete() //删除飞船，具体待定

        ---
        - property：
            - power
            - run_state
    + planet
        - commander
            * signal_sender
                - create_airship()
                - let_fly()
                - let_stop()
                - let_delete()

指令格式：
    {
        id:
        command:
    }
