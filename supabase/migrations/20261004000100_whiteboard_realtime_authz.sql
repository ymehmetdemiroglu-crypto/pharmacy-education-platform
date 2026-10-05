-- Private Broadcast channels for the whiteboard stream.
-- Topic format: whiteboard:<auth.uid()>:<sessionId>. A user may only join/receive/send on topics
-- carrying their own uid. Kept in a separate migration so it can be applied/rolled back independently.

CREATE POLICY "whiteboard_broadcast_receive_own" ON realtime.messages
    FOR SELECT TO authenticated
    USING (
        realtime.messages.extension = 'broadcast'
        AND realtime.topic() LIKE 'whiteboard:' || (SELECT auth.uid())::text || ':%'
    );

CREATE POLICY "whiteboard_broadcast_send_own" ON realtime.messages
    FOR INSERT TO authenticated
    WITH CHECK (
        realtime.messages.extension = 'broadcast'
        AND realtime.topic() LIKE 'whiteboard:' || (SELECT auth.uid())::text || ':%'
    );
