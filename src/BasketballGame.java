import java.io.BufferedReader;
import java.io.FileReader;
import java.util.*;

/**
 * BasketballGame
 * User: rduga
 * Date: 11/22/13
 * Time: 3:43 PM
 */
public class BasketballGame {

    private static class PlayerNameComparator implements Comparator<PlayerInfo> {

        public PlayerNameComparator() {}

        @Override
        public int compare(PlayerInfo o1, PlayerInfo o2) {
            return o1.name.compareTo(o2.name);
        }
    }

    private static class PlayerInfo implements Comparable<PlayerInfo> {

        public static final int PRORITY_COUNT = 15; // priority range is: 0-14

        public PlayerInfo(int priority, String name) {
            this.priority = priority;
            this.name = name;
        }

        public String name;
        public int priority;
        public int time;

        public int getPos() {
            // mapping user into time slice of size PRORITY_COUNT
            return time * PRORITY_COUNT + priority;
        }

        @Override
        public int compareTo(PlayerInfo o) {
            return Integer.compare(getPos(), o.getPos());
        }

        @Override
        public String toString() {
            return "PlayerInfo{" +
                    "name='" + name + '\'' +
                    ", priority=" + priority +
                    ", time=" + time +
                    '}';
        }
    }

    public static void main(String[] args) throws Exception {

        BufferedReader reader = new BufferedReader(new FileReader("BasketballGame.input"));

        int T = Integer.parseInt(reader.readLine());
//        System.out.println(T);

        final int minPercent = 0;
        final int maxPercent = 100;
        final int minHeight = 100;
        final int maxHeight = 240;

        for (int i = 1; i <= T; ++i) {
            // N M P

            String line = reader.readLine();
            Scanner scanner = new Scanner(line);
            int N = scanner.nextInt(); // number of players
            int M = scanner.nextInt(); // minutes <= 120
            int P = scanner.nextInt(); // players playing at a time

//            System.out.println(String.format("%d mins:%d pattime:%d", N, M, P));

            // tree sets help us keep the collections instantly sorted
            TreeMap<Integer, String> players = new TreeMap<Integer, String>();

            for (int j = 0; j != N; ++j) {
                line = reader.readLine();
                scanner = new Scanner(line);

                String name = scanner.next("[A-Z][a-z]*");
                int shotPerc = scanner.nextInt();
                int height = scanner.nextInt();

//                System.out.println(String.format("%s %d %d", name, shotPerc, height));

                // expression for absolute ordering
                players.put(-(shotPerc*(maxHeight + 1) + height), name);
            }

            TreeSet<PlayerInfo> team1sitting = new TreeSet<PlayerInfo>();
            TreeSet<PlayerInfo> team2sitting = new TreeSet<PlayerInfo>();

            boolean odd = true;
            int priority = 0; // lowest pripority -> the best prority

            // sit players to team1, team2
            for (Map.Entry<Integer, String> entry : players.entrySet()) {
                if (odd) {
                    team1sitting.add(new PlayerInfo(priority, entry.getValue()));
                } else {
                    team2sitting.add(new PlayerInfo(priority, entry.getValue()));
                    ++priority;
                }

                odd = !odd;
            }

            TreeSet<PlayerInfo> team1playing = new TreeSet<PlayerInfo>();
            TreeSet<PlayerInfo> team2playing = new TreeSet<PlayerInfo>();

            // initialization of playing players
            for (int j = 0; j != P; ++j) {
                PlayerInfo first1 = team1sitting.first();
                team1sitting.remove(first1);
                team1playing.add(first1);

                PlayerInfo first2 = team2sitting.first();
                team2sitting.remove(first2);
                team2playing.add(first2);
            }

//            System.out.println(String.format("T1 Starting players: playing: " + team1playing));
//            System.out.println(String.format("T1 Starting players: sitting: " + team1sitting));

            // minutes of playing game - making rotations
            for (int j = 1; j <= M; ++j) {
                // all playing players increase the time
                for (PlayerInfo playerInfo : team1playing) {
                    ++playerInfo.time;
                }
                // if there are some sitting players
                if (team1sitting.size() > 0) {
                    PlayerInfo first1sitting = team1sitting.first();
                    team1sitting.remove(first1sitting);
                    PlayerInfo last1playing = team1playing.last();
                    team1playing.remove(last1playing);

                    // change players
                    team1playing.add(first1sitting);
                    team1sitting.add(last1playing);
                }

                // the same for team2
                for (PlayerInfo playerInfo : team2playing) {
                    ++playerInfo.time;
                }
                // if there are some sitting players
                if (team2sitting.size() > 0) {
                    PlayerInfo first2sitting = team2sitting.first();
                    team2sitting.remove(first2sitting);
                    PlayerInfo last2playing = team2playing.last();
                    team2playing.remove(last2playing);

                    // change players
                    team2playing.add(first2sitting);
                    team2sitting.add(last2playing);
                }

//                System.out.println(String.format("T1 after " + j + "min: playing: " + team1playing));
//                System.out.println(String.format("T1 after " + j + "min: sitting: " + team1sitting));
            }

            // need to use list to avoid deletion of the same player names
            List<PlayerInfo> allPlayingPlayers = new ArrayList<PlayerInfo>();
            allPlayingPlayers.addAll(team1playing);
            allPlayingPlayers.addAll(team2playing);

            Collections.sort(allPlayingPlayers, new PlayerNameComparator());

            System.out.print(String.format("Case #%d:", i));
            for (PlayerInfo playingPlayer : allPlayingPlayers) {
                System.out.print(' ');
                System.out.print(playingPlayer.name);
            }
            System.out.println();
        }
    }
}
