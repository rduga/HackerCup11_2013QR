import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.*;

/**
 * BasketballGame
 * User: rduga
 * Date: 11/22/13
 * Time: 3:43 PM
 */
public class BasketballGame {



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

            System.out.println(String.format("%d mins:%d pattime:%d", N, M, P));

            TreeMap<Integer, String> players = new TreeMap<Integer, String>();

            for (int j = 0; j != N; ++j) {
                line = reader.readLine();
                scanner = new Scanner(line);

                String name = scanner.next("[A-Z][a-z]*");
                int shotPerc = scanner.nextInt();
                int height = scanner.nextInt();

//                System.out.println(String.format("%s %d %d", name, shotPerc, height));

                players.put(-(shotPerc*(maxHeight + 1) + height), name);
            }

            List<String> team1 = new ArrayList<String>();
            List<String> team2 = new ArrayList<String>();

            boolean odd = true;

            for (Map.Entry<Integer, String> entry : players.entrySet()) {
                if (odd) {
                    team1.add(entry.getValue());
                } else {
                    team2.add(entry.getValue());
                }

                odd = !odd;
            }

            System.out.println(players);
            System.out.println(team1);
            System.out.println(team2);


//            int team1idx = team1.size() - (M % team1.size()) - 1;
//            int team2idx = team2.size() - (M % team2.size()) - 1;
            int team1idx = M % team1.size();
            int team2idx = M % team2.size();

            // FIXME deleted names by using sets
//            TreeSet<String> playingPlayers = new TreeSet<String>();
            List<String> playingPlayers = new ArrayList<String>();

            for (int j = 0; j != P; ++j) {

                playingPlayers.add(team1.get(team1idx));
                playingPlayers.add(team2.get(team2idx));

                team1idx = (team1idx + 1) % team1.size();
                team2idx = (team2idx + 1) % team2.size();
            }

            Collections.sort(playingPlayers);

            System.out.print(String.format("Case #%d:", i));
            for (String playingPlayer : playingPlayers) {
                System.out.print(' ');
                System.out.print(playingPlayer);
            }
            System.out.println();
        }
    }
}
